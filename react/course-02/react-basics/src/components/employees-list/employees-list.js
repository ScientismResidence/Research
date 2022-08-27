import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({employees, onDelete, onToggleProp}) => {
    const employeesElements = employees.map(value => {
        const {id, ...props} = value;
        return <EmployeesListItem
            key={id}
            {...props}
            onDelete={() => onDelete(id)}
            onToggleProp={(event) => onToggleProp(id, event.currentTarget.getAttribute("data-toggle"))}
        />
    });
    
    return (
        <ul className="app-list list-group">
            {employeesElements}
        </ul>
    )
}

export default EmployeesList;