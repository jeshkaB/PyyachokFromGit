const EventAnswerCard = ({answ}) => {
 return (

        <div>
             {JSON.stringify(answ) !== '{}' &&
                <div>
                    <h5> - {answ.answer}</h5>
                    <p>{answ.user.name}, {answ.createdAt.slice(0, 10)}</p>

                </div>}
        </div>
    );
};

export {EventAnswerCard};
