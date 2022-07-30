import "./app-filter.css";

const AppFilter = ({filter, onChangeFilter}) => {
    const buttons = [
        {name: "all", label: "All"},
        {name: "increased", label: "To be premiumed"},
        {name: "salaryGreaterOf1000", label: "Salary greater 1000$"},
    ];

    const buttonElements = buttons.map(value => {
        const isActive = value.name === filter ? "btn-light" : "btn-outline-light";
        return (
            <button 
                key={value.name}
                className={`btn ${isActive}`}
                type="button"
                onClick={() => onChangeFilter(value.name)}
            >
                {value.label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {buttonElements}
        </div>
    );
}

export default AppFilter;