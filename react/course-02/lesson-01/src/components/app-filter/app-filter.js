import "./app-filter.css";

const AppFilter = () => {
    return (
        <div className="btn-group">
            <button className="btn btn-light" type="button">
                All
            </button>
            <button className="btn btn-outline-light" type="button">
                To be premiumed
            </button>
            <button className="btn btn-outline-light" type="button">
                Salary greater 1000$
            </button>
        </div>
    );
}

export default AppFilter;