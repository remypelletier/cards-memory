import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import ProgressBar from "../components/ProgressBar";
import Modal from "../components/Modal";
import { Form, Input, Group } from "../components/Form";
import ErrorCatcher from "../components/ErrorCatcher";  
import Score from "../core/Score";
import { DeckRequest } from "../core/ApiRequest";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Cards number',
        dataIndex: 'cardsNumber',
        key: 'cardsNumber',
        sortable: true
    },
    {
        title: 'Success rate',
        dataIndex: 'successRate',
        key: 'successRate',
        sortable: true
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    },
];

let apiRequest;

const Decks = () => {

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [dataSource, setDataSource] = useState(false);
    const [editDeck, setEditDeck] = useState(false);
    const [deleteDeck, setDeleteDeck] = useState(false);
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        /**
         * Get list of decks from database
         */
        apiRequest = new DeckRequest();
        apiRequest.getAll({userId: 1, countAnswer: true})
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
        return response.data.map((deck) => {
            const score = new Score({
                almost: deck.answerCategoryNumberAlmost,
                good: deck.answerCategoryNumberGood,
                reviewNeeded: deck.answerCategoryNumberReviewNeeded,
                notAnswered: deck.answerCategoryNumberNotAnswered
            });
            return ({
                key: deck.id,
                name: deck.name,
                cardsNumber: deck.cardNumber,
                successRate: <ProgressBar score={score.getSuccessRate()} />,
                actions: (<>
                    <button onClick={() => handleClick.edit(deck)} className="text-indigo-600 mr-3">Edit</button>
                    <button onClick={() => handleClick.delete(deck)} className="text-red-600">Delete</button>
                </>)
            });
        })
    }

    const handleClick = {
        /**
         * open AddForm in modal
         */
        add: () => {
            setIsAdd(true);
        },
        /**
         * open EditForm in modal and update deck with selected deck
         */
        edit: (deck) => {
            setEditDeck(deck);
            setIsEdit(true);
        },
        /**
         * open DeleteForm in modal and update deck with selected deck
         */
        delete: (deck) => {
            setDeleteDeck(deck);
            setIsDelete(true);
        }
    }

    const handleSubmit = {
        /**
         * add new deck to database and add it to state
         */
        add: (deck, action) => {
            if (action === 'save') {
                deck.key = deck.id;
                deck.cardsNumber = 0;
                deck.successRate = <ProgressBar score={0} />;
                deck.actions =(<>
                    <button onClick={() => handleClick.edit(deck)} className="text-indigo-600 mr-3">Edit</button>
                    <button onClick={() => handleClick.delete(deck)} className="text-red-600">Delete</button>
                </>)
                setDataSource(dataSource => [...dataSource, deck]);
            }
            setIsAdd(false);
        },
        /**
         * update deck from database and update it from state
         */
        edit: (deck, action) => {
            if (action === 'edit') {
                const editedDataSource = dataSource.map((data) => {
                    if (data.key === deck.id) {
                        data.name = deck.name;
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
         * remove deck from database and remove it from state
         */
        delete: (deck, action) => {
            if (action === 'delete') {
                setDataSource(dataSource.filter(data => data.key !== deck.id));
            }
            setIsDelete(false);
        }
    }

    return (
        <ErrorCatcher error={errors}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-5xl font-bold">Decks</h2>
                <Button onClick={handleClick.add}>Add deck</Button>
            </div>
            {!isLoading && <Table dataSource={dataSource} columns={columns}></Table>}
            <Modal openState={[isAdd, setIsAdd]} title="Add Deck" description="Add deck to your list">
                <AddForm onSubmit={handleSubmit.add}></AddForm>
            </Modal>
            <Modal openState={[isEdit, setIsEdit]} title="Edit Deck" description="Edit this deck">
                <EditForm onSubmit={handleSubmit.edit} deck={editDeck}></EditForm>
            </Modal>
            <Modal openState={[isDelete, setIsDelete]} title="Delete Deck" description="Delete deck to your list">
                <DeleteForm onSubmit={handleSubmit.delete} deck={deleteDeck}></DeleteForm>
            </Modal>
        </ErrorCatcher>
    );
}

const AddForm = (props) => {

    const { onSubmit } = props;

    const handleSubmit = (formValues, action) => {
        if (action === 'confirm') {
            apiRequest.post({
                name: formValues.name,
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
            <Group className="flex justify-between pt-6">
                <Button type="default" name="confirm">Save</Button>
                <Button type="warning" name="cancel">Cancel</Button>
            </Group>
        </Form>
    )
}

const DeleteForm = (props) => {

    const { onSubmit, deck } = props;

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.name === 'confirm') {
            apiRequest.delete(deck.id)
            .then((response) => {
                onSubmit(deck, 'delete');
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

    const { onSubmit, deck } = props;

    const handleSubmit = (formValues, action) => {
        
        if (action === 'confirm') {
            apiRequest.patch(deck.id, {
                name: formValues.name
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
        <Form onSubmit={handleSubmit}>
            <Input
                label="name"
                name="name"
                type="text"
                defaultValue={deck.name}
                constraints={{required: true}}
            />
            <Group className="flex justify-between pt-6">
                <Button type="default" name="confirm">Save</Button>
                <Button type="warning" name="cancel">Cancel</Button>
            </Group>
        </Form>
    )
}


export default Decks;
