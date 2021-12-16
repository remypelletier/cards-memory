import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import ProgressDot from "../components/ProgressDot";
import Modal from "../components/Modal";
import { Form, Input, Group, WyswygEditor } from "../components/Form";
import ErrorCatcher from "../components/ErrorCatcher";  
import { CardRequest } from "../core/ApiRequest";
import { secondsToDhms, dhmsShortFormat, dhmsLongFormat } from "../utils/utils";
import { useParams } from "react-router-dom";
import CreateMarkup from "../components/CreateMarkup";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Time since last review',
        dataIndex: 'lastSession',
        key: 'lastSession',
        sortable: true
    },
    {
        title: 'Number of answer',
        dataIndex: 'answerNumber',
        key: 'answerNumber',
        sortable: true
    },
    {
        title: 'The last 5 results',
        dataIndex: 'lastResults',
        key: 'lastResults',
        sortable: true
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
        collapsible: true
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    },
];

let apiRequest;

const Cards = () => {

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [dataSource, setDataSource] = useState(false);
    const [editCard, setEditCard] = useState(false);
    const [deleteCard, setDeleteCard] = useState(false);
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
   
    useEffect(() => {
        /**
         * Get list of cards from database
         */
        apiRequest = new CardRequest();
        apiRequest.getAll({deckId: params.id, getAnswer: true})
            .then((response) => {
                const dataSource = formatDataSourceFromRequest(response);
                setDataSource(dataSource);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response);
                } else {
                    setErrors({status: 503})
                }
            })
    }, []);

    const formatDataSourceFromRequest = (response) => {
        let dataSource = [];
        response.data.forEach((card) => {
            let index = dataSource.findIndex((data) => data.name === card.name);
            // card already exist : add result
            if (index > -1) {
                dataSource[index].results.push({
                    answerCategory: card.answer_category_code,
                    date: card.date
                })
            } else {
            // card doesn't exist : add card
            const obj = {
                    answerCategory: card.answer_category_code,
                    date: card.date
                }
                dataSource.push({
                    id: card.id,
                    name: card.name,
                    answer: card.answer,
                    results: obj.answerCategory === null ? [] : [obj]
                });
            }
        });
        return dataSource.map((data, index) => {
            let lastSession = 'Never';
            if (data.results.length > 0) {
                const milisecondeElapsed = Date.now() - new Date(data.results[0].date);
                lastSession = dhmsShortFormat(secondsToDhms(milisecondeElapsed / 1000));
            }
            return ({
                key: data.id,
                name: data.name,
                answer: <CreateMarkup>{data.answer}</CreateMarkup>,
                lastSession: lastSession,
                answerNumber: data.results.length,
                lastResults: <ProgressDot index={index} categories={data.results.map((result) => result.answerCategory)} limit={5} />,
                actions: (<>
                    <button onClick={() => handleClick.edit(data)} className="text-indigo-600 mr-3">Edit</button>
                    <button onClick={() => handleClick.delete(data)} className="text-red-600">Delete</button>
                </>)
            });
        });
    }

    const handleClick = {
        /**
         * open AddForm in modal
         */
        add: () => {
            setIsAdd(true);
        },
        /**
         * open EditForm in modal and update card with selected card
         */
        edit: (card) => {
            setEditCard(card);
            setIsEdit(true);
        },
        /**
         * open DeleteForm in modal and update card with selected card
         */
        delete: (card) => {
            setDeleteCard(card);
            setIsDelete(true);
        }
    }

    const handleSubmit = {
        /**
         * add new card to database and add it to state
         */
        add: (card, action) => {
            if (action === 'save') {
                card.key = card.id,
                card.lastSession = 'Never',
                card.answerNumber = 0,
                card.answer = <CreateMarkup>{card.answer}</CreateMarkup>
                card.lastResults = <ProgressDot index={card.id} categories={[]} limit={5} />,
                card.actions = (<>
                    <button onClick={() => handleClick.edit(card)} className="text-indigo-600 mr-3">Edit</button>
                    <button onClick={() => handleClick.delete(card)} className="text-red-600">Delete</button>
                </>)

                setDataSource(dataSource => [...dataSource, card]);
            }
            setIsAdd(false);
        },
        /**
         * update card from database and update it from state
         */
        edit: (card, action) => {
            const id = card.id === undefined ? card.key : card.id;
            if (action === 'edit') {
                const editedDataSource = dataSource.map((data) => {
                    if (data.key === id) {
                        data.name = card.name;
                        data.answer = <CreateMarkup>{card.answer}</CreateMarkup>;
                        data.actions = (<>
                            <button onClick={() => handleClick.edit(data)} className="text-indigo-600 mr-3">Edit</button>
                            <button onClick={() => handleClick.delete(data)} className="text-red-600">Delete</button>
                        </>)
                    }
                    return data;
                })
                setDataSource(editedDataSource);
            }
            setIsEdit(false);
        },
        /**
         * remove card from database and remove it from state
         */
        delete: (card, action) => {
            const id = card.id === undefined ? card.key : card.id;
            if (action === 'delete') {
                setDataSource(dataSource.filter(data => data.key !== id));
            }
            setIsDelete(false);
        }
    }

    return (
        <ErrorCatcher error={errors}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-bold">Cards</h2>
                <Button onClick={handleClick.add}>Add card</Button>
            </div>
            {!isLoading && <Table dataSource={dataSource} columns={columns}></Table>}
            <Modal openState={[isAdd, setIsAdd]} title="Add Card" description="Add card to your list">
                <AddForm onSubmit={handleSubmit.add} deckId={params.id}></AddForm>
            </Modal>
            <Modal openState={[isEdit, setIsEdit]} title="Edit Card" description="Edit this card">
                <EditForm onSubmit={handleSubmit.edit} card={editCard}></EditForm>
            </Modal>
            <Modal openState={[isDelete, setIsDelete]} title="Delete Card" description="Delete card to your list">
                <DeleteForm onSubmit={handleSubmit.delete} card={deleteCard}></DeleteForm>
            </Modal>
        </ErrorCatcher>
    );
}

const AddForm = (props) => {

    const { onSubmit, deckId } = props;

    const handleSubmit = (formValues, action) => {
        if (action === 'confirm') {
            apiRequest.post({
                name: formValues.name,
                answer: formValues.answer,
                deckId: deckId 
            }).then((response) => {
                onSubmit(response.data, 'save');
            })
            .catch((error) => {
                  // error
            });              
        } if (action === 'cancel') {
            onSubmit({}, 'cancel');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                label="name"
                name="name"
                type="text"
                constraints={{required: true}}
            />
            <WyswygEditor
                label="Wyswyg"
                name="answer"
                constraints={{required: true}}
            />
            <Group className="flex justify-between pt-6">
                <Button type="default" name="confirm">Save</Button>
                <Button type="warning" name="cancel">Cancel</Button>
            </Group>
        </Form>
    )
}

const DeleteForm = (props) => {

    const { onSubmit, card } = props;

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.name === 'confirm') {
            const id = card.id === undefined ? card.key : card.id;
            apiRequest.delete(id)
            .then((response) => {
                onSubmit(card, 'delete');
              })
              .catch((error) => {
                  // error
              });
        }
        if (e.target.name === 'cancel') {
            onSubmit({}, 'cancel');
        }
    }

    return (
        <Group className="flex justify-between pt-6">
            <Button type="warning" name="confirm" onClick={handleClick} >Delete</Button>
            <Button type="default" name="cancel" onClick={handleClick} >Cancel</Button>
        </Group>
    )
}

const EditForm = (props) => {

    const { onSubmit, card } = props;

    const handleSubmit = (formValues, action) => {
        
        if (action === 'confirm') {
            const id = card.id === undefined ? card.key : card.id;
            apiRequest.patch(id, {
                name: formValues.name,
                answer: formValues.answer
            }).then((response) => {
                onSubmit(response.data, 'edit');
            })
            .catch((error) => {
                // error
            });
                
        } 
        if (action === 'cancel') {
            onSubmit({}, 'cancel');
        }

    }

    return (
        <Form onSubmit={handleSubmit} defaultValues={ {name: card.name, answer: card.answer} }>
            <Input
                label="name"
                name="name"
                type="text"
                constraints={{required: true}}
            />
            <WyswygEditor
                label="Wyswyg"
                name="answer"
                constraints={{required: true}}
            />
            <Group className="flex justify-between pt-6">
                <Button type="default" name="confirm">Save</Button>
                <Button type="warning" name="cancel">Cancel</Button>
            </Group>
        </Form>
    )
}


export default Cards;
