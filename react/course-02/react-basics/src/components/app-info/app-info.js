import './app-info.css';

const AppInfo = ({total, increasedCount}) => {
    return (
        <div className="app-info">
            <h1>Employees in company</h1>
            <h2>Total employees: {total}</h2>
            <h2>Total premiumed employees: {increasedCount}</h2>
        </div>
    );
}

export default AppInfo;