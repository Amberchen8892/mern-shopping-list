import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modalOpen: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({ msg: null });
      }
    }
    if (this.state.modalOpen) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }
  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    console.log("check current state", this.state);
    // create user
    const newUser = {
      name,
      email,
      password,
    };
    this.props.register(newUser);

    // close modal
    // this.toggle();
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="mb-3"
                  id="name"
                  placeholder="Enter your name"
                  onChange={this.onChange}
                ></Input>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  className="mb-3"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={this.onChange}
                ></Input>
                <Label for="password">Enter your password</Label>
                <Input
                  type="password"
                  name="password"
                  className="mb-3"
                  id="password"
                  placeholder="Enter your password"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
