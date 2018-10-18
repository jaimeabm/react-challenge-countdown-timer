import { Component } from 'react'
import Display from './ui/Display'

export default class App extends Component {

    constructor({countdownDate}) {
        super()
        this.countdownDate = countdownDate

        // Set initial State
        this.state = {
            countdownDate: 0,
            currentDate: 0
        };
    }

    componentDidMount() {
        // Update timer
        console.log("Start timer...")
        this.ticking = setInterval(() => {
            var completed = false
            var currentDate = (new Date()).getTime()
            console.log("countdownDate:")
            console.log(this.countdownDate)
            console.log("currentDate:")
            console.log(currentDate)
            var diff = this.countdownDate - currentDate;
            console.log("diff:")
            console.log(diff)
            var days = 0
            var hours = 0
            var minutes = 0
            var seconds = 0

            if(diff < 0)
            {
                completed = true
                clearInterval(this.ticking)
            }
            else
            {
                // Calculate Days, Hours, Minutes, Seconds
                days = Math.floor(diff / (1000 * 60 * 60 * 24));
                hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((diff % (1000 * 60)) / 1000);
            }
            
            // New state each time
            var obj = {
                days, hours, minutes, seconds, completed
            }
            console.log(obj)
            this.setState(obj)
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.ticking)
        console.log("Stop timer...")
    }

    render() {
        const { days, hours, minutes, seconds, completed } = this.state
        return (
            <div className="grid">
                <div className="row">
                    <Display unit="Days" value={days}></Display>
                    <Display unit="Hours" value={hours}></Display>
                    <Display unit="Minutes" value={minutes}></Display>
                    <Display unit="Seconds" value={seconds}></Display>
                </div>
            </div>
        )
    }

}
