import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from "../employees-list/employees-list";
import EmployeeAddForm from "../employee-add-form/employee-add-form";
import { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { id: 1, name: "John S.", salary: 1000, isIncreased: false, isRisen: true },
                { id: 2, name: "Mark F.", salary: 800, isIncreased: true, isRisen: false },
                { id: 3, name: "Emilie D.", salary: 1200, isIncreased: false, isRisen: false }
            ],
            searchTerm: '',
            filter: 'all'
        };
    }

    deleteItem = (id) => {
        this.setState(({employees}) => {
            return  {
                employees: employees.filter(value => value.id !== id)
            };
        });
    }

    addItem = (name, salary) => {
        this.setState(({employees}) => {
            const newOne = {
                id: employees[employees.length - 1].id + 1,
                name: name,
                salary: salary,
                increase: false
            };
            return {
                employees: [...employees, newOne]
            };
        });
    }

    toggleProp = (id, prop) => {
        this.setState(({employees}) => ({
            employees: employees.map(value => {
                if (value.id === id) {
                    return {...value, [prop]: !value[prop]}
                } else {
                    return value;
                }
            })
        }));
    }

    searchEmployees = (items, searchTerm) => {
        if (searchTerm.length === 0) {
            return items;
        }

        return items.filter(value => value.name.indexOf(searchTerm) !== -1);
    }

    applyFilter = (items, filter) => {
        switch (filter) {
            case "increased":
                return items.filter(value => value.isIncreased);
            case "salaryGreaterOf1000":
                return items.filter(value => value.salary > 1000);
            default:
                return items;
        }
    }

    updateSearchTerm = (term) => {
        this.setState({searchTerm: term});
    }

    updateFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {employees, searchTerm, filter} = this.state;
        const filteredEmployees = this.applyFilter(this.searchEmployees(employees, searchTerm), filter);
    
        return (
            <div className="app">
                <AppInfo 
                    total={employees.length}
                    increasedCount={employees.filter(value => value.isIncreased).length}
                />
                <div className="search-panel">
                    <SearchPanel onSearchTermUpdate={this.updateSearchTerm}/>
                    <AppFilter filter={filter} onChangeFilter={this.updateFilter}/>
                </div>
    
                <EmployeesList
                    employees={filteredEmployees}
                    onDelete={this.deleteItem}
                    onToggleProp={this.toggleProp}
                />
                <EmployeeAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
