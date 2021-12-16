import React, { useState, useEffect, useRef } from "react";
import FieldValidation from "../core/FieldValidation";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Form = (props) => {
    
    const allowedComponents = ['Input', 'Textarea', 'Button', 'WyswygEditor'];

    const { onSubmit, children, defaultValues } = props;

    /**
     * object initialization with the correct key
     */
    const initObjWithFieldsNameAndDefaultValues = Object.fromEntries(children.map((child) => {
        if (defaultValues === undefined)
            return [child.props.name, '']
        return [child.props.name, defaultValues[child.props.name]]
    }).filter((child) => child[0] !== undefined))

    /**
     * object initialization with the correct key
     */
    const initObjWithFieldsName = Object.fromEntries(children.map((child) => {
        return [child.props.name, '']
    }).filter((child) => child[0] !== undefined))

    /**
     * get fields contraints given to children
     */
    const fieldsConstraints = Object.fromEntries(children.map((child) => {
        return [child.props.name, child.props.constraints]
    }).filter((child) => child[0] !== undefined))

    const [errors, setErrors] = useState(initObjWithFieldsName);
    const [values, setValues] = useState(initObjWithFieldsNameAndDefaultValues);

    const handleChange = (name, value) => {
        setValues({...values, [name]: value});
    }
    
    const handleError = (name, value) => {
        setErrors({...errors, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.name === 'confirm') {
            const submitedErrors = getErrors();
            if (hasErrors(submitedErrors)) {
                setErrors({...errors, ...submitedErrors})
            } else {
                //submit
                onSubmit(values, e.target.name);
            }
        } else {
            onSubmit({}, e.target.name)
        }
    }

    const getErrors = () => {
        let errors = {};
            for (const field in fieldsConstraints) {
                let value = values[field]
                if (field === 'answer') {
                    value = new DOMParser().parseFromString(value, "text/html").documentElement.textContent
                }
                const validation = new FieldValidation({name: field, value: value, constraints: fieldsConstraints[field]});
                if (validation.hasErrors()) {
                    errors[field] = validation.getErrors();
                }
            }
        return {...errors};
    }

    const hasErrors = (errors) => {
        for (const field in errors) {
            if (errors[field].length > 0) {
                return true;
            }
        }
        return false;
    } 

    /**
     * map props to children allowed by allowedComponents
     * return the children cloned
     */
    const renderChildren = (children) => {
        return React.Children.map(children, (child) => {
            // stop recursive
            if (!React.isValidElement(child)) {
                return child;
            }
            const propsToAdd = () => {
                // child not allowed don't have additionnal props
                if (allowedComponents.find((element) => element === child.type.name) === undefined) {
                    return {}
                }
                // button can submit
                if (child.type.name === 'Button') {
                    return {onClick: handleSubmit}
                }
                // others can be controlled
                return {
                    onChange: handleChange,
                    onError: handleError,
                    value: values[child.props.name],
                    errors: errors[child.props.name]
                }
            }

            // apply the same props to deeper children
            if (child.props.children) {
                child = React.cloneElement(child, {
                  children: renderChildren(child.props.children)
                });
            }

            return React.cloneElement(child, propsToAdd())
        })
    }

    return (
        <form className="flex flex-col pt-3">
            {renderChildren(children)}
        </form>
    )
}

const Group = (props) => {

    const { className, children } = props;

    return (
        <div className={className}>
            {children}
        </div>
    )
}

const Input = (props) => {

    const {label, name, type, value, onChange: setValue, onError: setError, errors, constraints, defaultValue = ''} = props;

    useEffect(() => {
        if (defaultValue !== '') {
            setValue(name, defaultValue);
        }
    }, [])

    const handleChange = (e) => {
        const validation = new FieldValidation({name: name, value: e.target.value, constraints: constraints});
        if (validation.hasErrors()) {
            setError(name, validation.getErrors());
        } else {
            setError(name, []);
        }
        setValue(name, e.target.value);
    }

    const renderErrors = () => {
        return errors.map((error, index) => {
            return <span className="text-sm text-red-600" key={`${name}-${error.name}-${index}`}>{error.value}</span>
        });
    }

    const hasErrors = () => {
        return errors !== '' && errors.length > 0;
    }

    return (
        <div className="flex flex-col mt-2">
            <label htmlFor={name} className="cursor-pointer mb-1">{label}</label>
            {hasErrors() && renderErrors()}

            <input id={name} name={name} type={type} value={value} onChange={handleChange} className={`py-1 px-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-100 ${hasErrors() && 'border-red-600'}`} />
        </div>
    )
}

const WyswygEditor = (props) => {

    const {label, name, type, value, onChange: setValue, onError: setError, errors, constraints, defaultValue = ''} = props;

    const reactQuillRef = useRef(null);

    useEffect(() => {
            if (defaultValue !== '') {
                setValue(name, defaultValue);
            }
    }, [])

    const handleChange = (value) => {
        const validation = new FieldValidation({name: name, value: new DOMParser().parseFromString(value, "text/html").documentElement.textContent, constraints: constraints});
        if (validation.hasErrors()) {
            setError(name, validation.getErrors());
        }
        setValue(name, value);
    }

    const renderErrors = () => {
        return errors.map((error, index) => {
            return <span className="text-sm text-red-600" key={`${name}-${error.name}-${index}`}>{error.value}</span>
        });
    }

    const hasErrors = () => {
        return errors !== '' && errors.length > 0;
    }

    return (
        <div className="flex flex-col mt-2">
            <label htmlFor={name} className="cursor-pointer mb-1">{label}</label>
            {hasErrors() && renderErrors()}
            <ReactQuill ref={reactQuillRef} theme="snow" value={value.props === undefined ? value : value.props.children} onChange={handleChange} />
        </div>
    )
}




export { Form, Input, Group, WyswygEditor };
