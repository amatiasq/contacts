import autobind from 'decorators/autobind';
import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import TextField from 'react-mdl/lib/Textfield';
import {
  goToList,
  createContact,
  saveContact,
} from '../app/actions';
import ContactsStore from './contacts-store';


const fields = [
  'firstName',
  'lastName',
  'phone',
  'email',
  'facebook',
  'google',
  'twitter',
  'linkedIn',
];


export default class ContactEdit extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    isNew: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.model = {};
    this.validateProps();

    fields.forEach(field => {
      const pascalCase = field[0].toUpperCase() + field.substr(1);
      const handler = `on${pascalCase}Change`;
      this[handler] = event => this.setValue(field, event.target.value);
    });
  }

  componentDidMount() {
    if (this.props.id)
      ContactsStore.on(this.props.id, this.onChange);
  }
  componentWillUnmount() {
    if (this.props.id)
      ContactsStore.off(this.props.id, this.onChange);
  }

  getContactName(contact) {
    if (contact) return `${contact.firstName || ''} ${contact.lastName || ''}`;
    return this.props.isNew ? 'New contact' : 'Loading...';
  }

  getValue(contact, field) {
    if (field in this.model) return this.model[field];
    return contact ? contact[field] : '';
  }

  save() {
    if (this.props.isNew)
      createContact(this.model);
    else
      saveContact(this.props.id, this.model);
  }

  setValue(field, value) {
    this.model[field] = value;
    this.forceUpdate();
  }

  validateProps() {
    const { id, isNew } = this.props;
    if (!id && !isNew)
      throw new Error('ContactEdit invoked without "isNew" flag and without an "id".');
  }

  @autobind
  onChange() {
    this.forceUpdate();
  }

  @autobind
  onFormSubmit(event) {
    event.preventDefault();
    this.save();
  }

  render() {
    const contact = this.props.isNew ? null : ContactsStore.get(this.props.id);

    return (
      <form
        className="contact-edit-component"
        onSubmit={this.onFormSubmit}>

        <div className="aside">
          <img className="avatar" src={this.model.avatar_url} />
          <span className="full-name">{this.getContactName(contact)}</span>
        </div>

        <div className="content">
          <header>
            <h3 className="mdl-typography--headline">Contact Editing</h3>

            <nav>
              <Button
                raised
                ripple
                type="button"
                onClick={goToList}>
                Cancel
              </Button>

              <Button
                primary
                raised
                ripple>
                Save
              </Button>
            </nav>
          </header>

          <div>
            <div className="form-row">
              <label>Name</label>
              <TextField
                label="First name"
                required
                value={this.getValue(contact, 'firstName')}
                onChange={this.onFirstNameChange}/>
            </div>

            <div className="form-row">
              <TextField
                label="Last name"
                value={this.getValue(contact, 'lastName')}
                onChange={this.onLastNameChange}/>
            </div>

            <div className="form-row">
              <label>Contact</label>
              <TextField
                label="Phone"
                type="phone"
                value={this.getValue(contact, 'phone')}
                onChange={this.onPhoneChange}/>
            </div>

            <div className="form-row">
              <TextField
                label="Email"
                type="email"
                value={this.getValue(contact, 'email')}
                onChange={this.onEmailChange}/>
            </div>

            <div className="form-row">
              <label>Profiles</label>
              <TextField
                label="Facebook"
                type="url"
                value={this.getValue(contact, 'facebook')}
                onChange={this.onFacebookChange}/>
            </div>

            <div className="form-row">
              <TextField
                label="Google+"
                type="url"
                value={this.getValue(contact, 'google')}
                onChange={this.onGoogleChange}/>
            </div>

            <div className="form-row">
              <TextField
                label="Twitter"
                type="url"
                value={this.getValue(contact, 'twitter')}
                onChange={this.onTwitterChange}/>
            </div>

            <div className="form-row">
              <TextField
                label="LinkedIn"
                type="url"
                value={this.getValue(contact, 'linkedIn')}
                onChange={this.onLinkedInChange}/>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
