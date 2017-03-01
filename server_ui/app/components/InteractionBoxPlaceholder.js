import React from 'react';
import Radium from 'radium';

class InteractionBoxPlaceholder extends React.PureComponent {
    constructor() {
        super();
    }
    
    render() {
        return (
            <section style = {styles.container}>
                <h4 style = {styles.text}>Leap Motion Controller not detected</h4>
            </section>
        );
    }
}

export default Radium(InteractionBoxPlaceholder);

const styles = {
    container: {
        width: '40vh',
        height: '40vh',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '3vh',
        paddingRight: '3vh',
        paddingBottom: '3vh',
        paddingLeft: '3vh',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
    }
}