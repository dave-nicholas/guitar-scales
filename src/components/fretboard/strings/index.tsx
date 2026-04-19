import './index.css';

const NUMBER_OF_STRINGS = 6;

export const Strings = () => {
    const strings = [];

    for (let i = 0; i < NUMBER_OF_STRINGS; i++) {
        strings.push(
            <div key={`${i}`} className={`string string-${i}`}>
                {' '}
                .
            </div>
        );
    }

    return <div className="strings">{strings}</div>;
};
