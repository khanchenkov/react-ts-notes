import React from "react";
import "./Loading.sass"

const Loading = () => {
    return (
        <div className="loading">
            <svg className="loading__spinner" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="217px" height="217px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="dodgerblue" strokeWidth="2" r="11" strokeDasharray="51.83627878423158 19.27875959474386"/>
            </svg>
        </div>
    );
};

export default Loading;
