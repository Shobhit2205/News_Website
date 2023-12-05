import React from "react";

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
        <div className="card h-100">
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark mt-auto" rel="noreferrer">Read more..</a>
            </div>
        </div>
    );
}

export default NewsItem;
