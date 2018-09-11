import React, { Component } from 'react';
import {ParseHurtboxState, ToHexWithoutPadding} from '../util/util';

class HurtboxStateView extends Component{
    constructor(props){
        super(props);

        this.state = {
            list : props.list
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.list !== state.list) {
          return {
              list : props.list
          };
        }
    
        return null;
      }

    render(){
        return (
            <div>
                <h4>Hurtboxes States</h4>
                <table>
                    <thead>
                        <tr>
                            <td>
                                Frame
                            </td>
                            <td>
                                Hurtbox Bone
                            </td>
                            <td>
                                State
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map(state => {
                                return (
                                    <tr>
                                        <td>
                                            {state.Frame + 1}
                                        </td>
                                        <td>
                                            {state.Bone === null ? "All" : ToHexWithoutPadding(state.Bone)}
                                        </td>
                                        <td>
                                            {ParseHurtboxState(state.State)}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HurtboxStateView;