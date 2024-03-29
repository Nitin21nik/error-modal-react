import React, {useState} from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const [error, setError] = useState();

    const addUserChangeHandler = event => {
        setEnteredUsername(event.target.value);
    }

    const addAgeChangeHandler = event => {
        setEnteredAge(event.target.value);
    }

    const addUserHandler = event => {
        event.preventDefault();
        if(enteredUsername.trim().length===0 || enteredAge.trim().length===0){
            setError({
                'title': 'Invalid Input',
                'message': 'Please enter a valid Username and Age (non-empty values).',
            })
            return;
        }
        if(+enteredAge < 1){
            setError({
                'title': 'Invalid Age',
                'message': 'Please enter a valid Age (>0).',
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
           { error && ( <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler} />)} 
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={enteredUsername} onChange={addUserChangeHandler}></input>
                    <label htmlFor='age'>Age(Years)</label>
                    <input type='text' id='age' value={enteredAge} onChange={addAgeChangeHandler}></input>
                    <Button type='submit'>Add</Button>
                </form>
            </Card>
        </div>
        
    );
}

export default AddUser;