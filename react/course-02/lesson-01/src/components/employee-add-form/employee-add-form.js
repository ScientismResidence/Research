import { Component } from 'react';
import './employee-add-form.css';

class EmployeeAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: 0
        };
    }

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {name, salary} = this.state;
        if (name.trim().length === 0 || Number(salary) === 0) {
            return;
        }

        this.props.onAdd(name, salary);
        this.setState(state => ({
            name: "",
            salary: 0
        }));
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Add new employee</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="What his name?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Sallary $"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light"
                        onClick={this.onSubmit}>Add</button>
                </form>
            </div>
        )
    }
}

export default EmployeeAddForm;