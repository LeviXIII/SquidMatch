import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Alert,
        Col, ControlLabel, Button, Checkbox } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class ChooseCriteria extends Component {
  render() {
    
    this.props.verifyToken();

    if (!this.props.isLoggedIn) {
        //this.props.userLogout();
      return <Redirect to="/" />
    }

    //Update status after updating your status.
    let updateAlert = <Alert style={adjustWindow} bsStyle="success" onDismiss={this.props.setUpdateSuccess}>
                        <h3 style={notice}>Account Updated!</h3>
                        <Button block={true} 
                        onClick={this.props.setUpdateSuccess}>OK</Button>
                    </Alert>

    return (
        <div>
            {this.props.updateSuccess ? (
            <div className="container">
                {updateAlert}
            </div>
      ) : (
      <div className="divBorder col-xs-10 col-sm-6 col-md-6 col-xs-offset-1 col-sm-offset-3 col-md-offset-3 formAccountSettings">
      <h1 style={Title}>Choose your Criteria</h1>
      {/* <h3 style={subTitle}>Your search criteria will be decided by the order you use.</h3> */}
      <Form horizontal className="container-fluid">
        <Col xs={2} sm={2} md={2}
            xsOffset={10} smOffset={10} mdOffset={10}>
            On/Off
        </Col>
        <FormGroup style={subTitle} controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                Age
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} >
                <FormControl componentClass="select" placeholder="Any"
                            name="searchAge" value={this.props.searchAge}
                            disabled={this.props.ageBox}
                            onChange={e => this.props.getCriteria(e)}>
                    <option value="< 20">{'< '}20</option>
                    <option value="21-25">21-25</option>
                    <option value="26-30">26-30</option>
                    <option value="> 31">{"> "}31</option>
                    <option value="Any">Any</option>
                </FormControl>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
                <Checkbox name="ageBox" checked={this.props.ageBox}
                        onChange={(e) => this.props.getCriteriaCheckBox(e)}/>
            </Col>
            
        </FormGroup>

        <FormGroup style={subTitle} controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={3} sm={2}>
                Location
            </Col>
            <Col xs={7} sm={8} md={8} lg={8} >
                <FormControl componentClass="select" placeholder="Any"
                            name="searchLocation" value={this.props.searchLocation}
                            disabled={this.props.locationBox}
                            onChange={e => this.props.getCriteria(e)}>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                    <option value="Europe">Europe</option>
                    <option value="Japan">Japan</option>
                    <option value="Any">Any</option>
                </FormControl>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
                <Checkbox name="locationBox" checked={this.props.locationBox}
                        onChange={(e) => this.props.getCriteriaCheckBox(e)}/>
            </Col>
        </FormGroup>

        <FormGroup style={subTitle} controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={3} sm={2}>
                Rank
            </Col>
            <Col xs={7} sm={8} md={8} lg={8}>
                <FormControl componentClass="select" placeholder="Any"
                            name="searchRank" value={this.props.searchRank}
                            disabled={this.props.rankBox}
                            onChange={e => this.props.getCriteria(e)}>
                    <option value="C">C</option>
                    <option value="B">B</option>
                    <option value="A">A</option>
                    <option value="S">S</option>
                    <option value="S+">S+</option>
                    <option value="Any">Any</option>
                </FormControl>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
                <Checkbox name="rankBox" checked={this.props.rankBox}
                        onChange={(e) => this.props.getCriteriaCheckBox(e)}/>
            </Col>
        </FormGroup>

        <FormGroup style={subTitle} controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={3} sm={2}>
                Mode
            </Col>
            <Col xs={7} sm={8} md={8} lg={8}>
                <FormControl componentClass="select" placeholder="Any"
                            name="searchMode" value={this.props.searchMode}
                            disabled={this.props.modeBox}
                            onChange={e => this.props.getCriteria(e)}>
                    <option value="Turf War">Turf War</option>
                    <option value="League">League</option>
                    <option value="Salmon Run">Salmon Run</option>
                    <option value="Any">Any</option>
                </FormControl>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
                <Checkbox name="modeBox" checked={this.props.modeBox}
                        onChange={(e) => this.props.getCriteriaCheckBox(e)}/>
            </Col>
        </FormGroup>

        <FormGroup style={subTitle} controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={3} sm={2}>
                Weapon
            </Col>
            <Col xs={7} sm={8} md={8} lg={8} >
                <FormControl componentClass="select" placeholder="Any"
                            name="searchWeapon" value={this.props.searchWeapon}
                            disabled={this.props.weaponBox}
                            onChange={e => this.props.getCriteria(e)}>
                    <option value="Shooters">Shooters</option>
                    <option value="Rollers">Rollers</option>
                    <option value="Chargers">Chargers</option>
                    <option value="Sloshers">Sloshers</option>
                    <option value="Splatlings">Splatlings</option>
                    <option value="Dualies">Dualies</option>
                    <option value="Brellas">Brellas</option>
                    <option value="Any">Any</option>
                </FormControl>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
                <Checkbox name="weaponBox" checked={this.props.weaponBox}
                        onChange={(e) => this.props.getCriteriaCheckBox(e)}/>
            </Col>
        </FormGroup>

        {this.props.userStatus === "Available" ? (
        <FormGroup>
            <Col xs={8} sm={4} md={4} lg={4} 
                xsOffset={2} smOffset={4} mdOffset={4} lgOffset={4}>
                <Link to="/results">
                    <Button style={loginButton} type="button"
                            onClick={this.props.searchCriteria}>
                        Search
                    </Button>
                </Link>
            </Col>
        </FormGroup>
        ) : (
            <h4 style={statusMessage}>Please set you status to "Available"</h4>
        )}
      </Form>
  </div>
    )}
</div>
    )
  }
}

//////////
//Styles//
//////////

const adjustWindow = {
    marginTop: '10%',
  }
  
const notice = {
fontFamily: 'paintball',
textAlign: 'center',
}

const splatoonFont = {
  fontFamily: 'paintball',
}

const signupButton = {
  width: '150px',
  backgroundColor: '#ff43b7',
  fontFamily: 'paintball',
}

const loginButton = {
  width: '150px',
  backgroundColor: '#7aff42',
  fontFamily: 'paintball',
}

const Title = {
  fontFamily: 'paintball',
  textAlign: 'center',
  color: '#948f8f',
}

const subTitle = {
  fontFamily: 'overpass',
  textAlign: 'center',
}

const statusMessage = {
    fontFamily: 'paintball',
    textAlign: 'center',
    color: '#948f8f',
  }

export default ChooseCriteria;