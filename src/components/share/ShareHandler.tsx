import React from 'react';
import { useLocation } from 'react-router-dom';

const ShareHandler: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const title = params.get('title');
    const text = params.get('text');

    React.useEffect(() => {
        if (text) {
            console.log("Shared text:", text);
        }
    }, [text]);

    return (
        <div>
            <h1>Shared Content</h1>
            {title && <h2>{title}</h2>}
            {text && <p>{text}</p>}
        </div>
    );
};

export default ShareHandler;
