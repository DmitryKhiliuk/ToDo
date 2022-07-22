import React from 'react';


type TitleUpdateType = {
    title: string
}

export const TitleUpdate = (props: TitleUpdateType) => {
    return (
        <>
            <span style={{marginRight: '20px', fontWeight: 'bold'}}>{props.title}</span>
        </>
    );
};

