import React, { Component } from 'react';
import ThrowHeader from './shared/ThrowHeader';
import ThrowData from './shared/ThrowData';

class ThrowView extends Component {
  constructor(props){
    super(props);

    this.state = {
        hitboxes : props.hitboxes
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.hitboxes !== state.hitboxes) {
      return {
        hitboxes : props.hitboxes
      };
    }

    return null;
  }

  render() {
    return (
      <div>
        <h4>Throws</h4>
        <table className="hitbox-table">
            <thead>
            <tr>
                    <ThrowHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <ThrowData hitbox={hitbox}></ThrowData>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
      </div>
    );
  }
}

export default ThrowView;
