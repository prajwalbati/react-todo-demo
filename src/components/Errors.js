import React from "react";

const Errors = ({ errors }) => {
    const getErrorsList = () => {
        if (errors && errors.length > 0) {
            let errorElem = errors.map((err, index) => {
                return <div className="row" key={index}>
                    <div className="col-sm-12">
                        <div className="alert alert-danger text-center" role="alert">
                            {err.msg}
                        </div>
                    </div>
                </div>
            });
            return errorElem;
        }
        return null;
    }

    return (
        <>
            {getErrorsList()}
        </>
    );
};

export default Errors;