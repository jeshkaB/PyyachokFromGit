const EventAnswerCard = ({answ}) => {
 return (

        <div>
             {JSON.stringify(answ) !== '{}' &&
                <div>
                    <h3>{answ.answer}</h3>
                    <p>{answ.user.name}</p>
                    <p>{answ.createdAt.slice(0, 10)}</p>
                </div>}
        </div>
    );
};

export {EventAnswerCard};
