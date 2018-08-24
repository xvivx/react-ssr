import React from 'react';
import counterHOC from '../container/counter/counterHOC';
import Void from '../componentUI/common/Void';
import Counter from '../componentUI/counter/Counter';
import CounterPercent from '../componentUI/counter/CounterPercent';

export default counterHOC(props => {
    const percent = Math.max(Math.min(props.counter / 100, 1) * 100, 0) .toFixed(0)+ '%';
    return (
        <Void>
            <Counter { ...props } />
            <CounterPercent counter={ props.counter } />
        </Void>
    )
});