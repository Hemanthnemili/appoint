import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
    appointmentList: [],
  }

  onToggleFunction = id => {
    this.setState(prevState=> (
        appointmentList:prevState.appointmentList.map(eachAppointment =>(
            if(id === appointmentList.id){
                return {...eachAppointment, isStarred: !eachAppointment.isStarred}
            }
            return eachAppointment
        ))
    ))
  }

  onChangeTitle = event =>{
      this.setState({titleInput:event.target.value})
  }

  onChangeDate= event =>{
      this.setState({dateInput:event.target.value})
  }

  onFilter = () => {
      const {isFilterActive}= this.state 
      this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
      event.preventDefault()
      const {titleInput, dateInput} = this.state 
      const formattedDate = dateInput ? format(new Date(dateInput)) : ''

      const newAppointment = {
          id : v4(),
          title:titleInput,
          date:formattedDate,
          isStarred:false,
      }

      this.setState(prevState =>({
          appointmentList: [prevState.appointmentList, newAppointment],
          titleInput:'',
          dateInput:'',
      }))
  }

  getFilteredAppointmentList = () => {
      const {appointmentList, isFilterActive} = this.state 
      
      if(isFilterActive){
          return appointmentList.filter(eachTransaction => eachTransaction.isStarred === true)
      }
      return appointmentList
  }

  render() {
      const {titleInput, dateInput, isFilterActive}=this.state
      const filteredClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
      const filterAppointmentList= this.getFilteredAppointmentList()


    return (
      <div className="background">
        <div className="responsive-cont">
          <div className="aap">
            <div className="appointments">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1>Add Appointments</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input id="date" type="date" value={dateInput} onChange={this.onChangeDate} className="input" />
                <button className="button" type="submit" >
                  Add
                </button>
              </form>
            </div>

            <div className="img-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="app-img"
              />
            </div>
          </div>

          <hr />

          <div className="results-cont">
           <h1>Appointments</h1>
           <button type="button"
           className={`filter-style ${filteredClassName}`}
           onClick={this.onFilter}
           >
               Starred
           </button>
          </div>
          <ul className="appointment-list">
              {filterAppointmentList.map(eachAppointment => (
                  <AppointmentItem key={eachAppointment.id}
                   appointmentDetails={eachAppointment}
                   toggleStar={this.onToggleFunction}
                  />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
