// This file is ???

function NoteItem(props) {
    console.log(props.note);

    return (
        <div>
            <div>
                {/* ??? */}
                {new Date(props.note.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{props.note.text}</h2>
        </div>
    );
}

export default NoteItem;