import React from "react";

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true})
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({
                    loading: false,
                    allMemeImgs: memes
                });
            })
    }

    handleChange(event) {
        console.log(this.state.allMemeImgs[52]);
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })

    }
    handleSubmit(event) {
        event.preventDefault();

        const randNum = Math.floor(Math.random() *(this.state.allMemeImgs.length));
        const randomImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg: this.state.allMemeImgs[randNum].url
        })
    }

    render() {
        return(
            <div>
                <form className={"meme-form"} onSubmit={this.handleSubmit}>
                    <input
                        type={"text"}
                        name={"topText"}
                        placeholder={"Top Text"}
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type={"text"}
                        name={"bottomText"}
                        placeholder={"Bottom Text"}
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />




                    <button>Gen</button>
                </form>
                <div className={"meme"}>
                    <img src={this.state.randomImg} alt={""}/>
                    <h2 className={"top"}>{this.state.topText}</h2>
                    <h2 className={"bottom"}>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;