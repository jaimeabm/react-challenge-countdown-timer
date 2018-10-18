import PropTypes from 'prop-types'

let numberStyle = {
    width: "15rem"
};

const Display = ({unit = 'NO UNIT', value = 0}) =>
        <div className="col-3">
            <div className="panel panel-default card " >
                <div className="card-block">
                    <h5 className="card-title">{unit}</h5>
                    <h4 className="card-text">{value}</h4>
                </div>
            </div>
        </div>

export default Display