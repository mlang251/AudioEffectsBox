import React from 'react';
import InteractionBox from './InteractionBox';
import Display from './Display';
import InteractionBoxPlaceholder from './InteractionBoxPlaceholder';

class InteractionBoxContainer extends React.PureComponent {
    constructor() {
        super();
        this.createStyles = this.createStyles.bind(this);
    }

    createStyles(coords) {
        //TODO: create the xyz translations based on the coordinates
        return {
            pointerStyles: {

            },
            shadowStyles: {

            }
        }
    }
    
    render() {
        const {pointerStyles, shadowStyles} = this.createStyles(this.props.coords);
        return (
            <div>
                <Display if = {this.props.isConnected}>
                    <InteractionBox />
                </Display>
                <Display if = {!this.props.isConnected}>
                    <InteractionBoxPlaceholder />
                </Display>
            </div>
        );
    }
}

export default InteractionBoxContainer;