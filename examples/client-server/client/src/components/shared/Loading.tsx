import './Loading.scss';
import { ReactElement } from 'react';
import React from 'react';

export function Loading(): ReactElement
{
    return (
        <div className="loading">
            <div className="dots"></div>
        </div>
    )
}