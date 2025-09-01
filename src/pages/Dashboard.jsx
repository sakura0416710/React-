const Dashboard = () => {

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Admin DashBoard</h1>
            </div>

            <h4>최근 일주일 로그인 수</h4>
            <canvas className="my-4 w-100" id="sevenDays" width="900" height="250"></canvas>

            <br />

            <h4>모든 날짜 로그인 수</h4>
            <canvas className="my-4 w-100" id="allDays" width="900" height="250"></canvas>

            <br></br>

            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-bg-dark rounded-3">
                        <h2>The Newest Board</h2>
                        <table style={{ textAlign: 'center', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Writer</th>
                                    <th>Date</th>
                                    <th>Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>The Newest Photo Board</h2>
                        <table style={{ textAlign: 'center', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Writer</th>
                                    <th>Date</th>
                                    <th>Views</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;