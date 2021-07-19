import React from 'react';
import Spinner from '../Spinner/Spinner.js';
import axios from 'axios';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode:"Home",
            isSearching:false,
            searchValue:"",
            hasSearched:false,
            showMore:false,
            searchedWords: []
        }
        this.englishToPersianNumbersMap = {
            "0":"۰",
            "1":"۱",
            "2":"۲",
            "3":"۳",
            "4":"۴",
            "5":"۵",
            "6":"۶",
            "7":"۷",
            "8":"۸",
            "9":"۹",
        }
    }


    componentDidMount() {
        const pathname = this.props.history.location.pathname.slice(1);
        const slashIndex = pathname.indexOf("/"); 
        if (slashIndex !== -1) {
            const wordToSearch = pathname.slice(slashIndex + 1);
            this.search(wordToSearch);
        }
    }

    renderSearchResultsSection = () => {
        if (this.state.isSearching) {
            return <Spinner />
        }
        else if (this.state.searchedWords.length > 0) {
            return (
                <>
                    {this.renderSearchedWords()}
                </>
            )
        }
        else if (this.state.hasSearched && this.state.searchedWords.length === 0) {
            return (
                <div className="no-results">
                    کلمه ای یافت نشد!
                </div>
            )
        }
    }

    fetchWords = (wordToSearch) => {
        axios.get(`https://stellardictserver.herokuapp.com/search?word=${wordToSearch}`)
        .then((response) => {
            this.setState({
                searchedWords:response.data.data,
                isSearching:false,
                hasSearched:true
            })
        })
        .catch((error) => {
            this.setState({
                isSearching:false,
                hasSearched:true
            })
        })
    }

    search = (wordToSearch) => {
        this.setState({
            isSearching: true,
            searchValue: wordToSearch
        })
        this.fetchWords(wordToSearch);
    }

    convertEnglishNumbersToPersian = (num) => {
        num = num.toString();
        let convertedNum = "";
        for(let i = 0; i < num.length; i++) {
            if(num[i] === '.') convertedNum += ".";
            else convertedNum += this.englishToPersianNumbersMap[num[i]];
        }
        return convertedNum;
    }

    correctWordMeaning = (meaning) => {
        return meaning.replace(/<\/?[^>]+(>|$)/g, "").replace(/>/g, "\n");
    }

    processMeaning = (meaning) => {
        return {
            synonym: meaning.indexOf("مترادف"),
            antonym: meaning.indexOf("متضاد"),
            reference: meaning.indexOf("←")
        };
    }

    checkForReferenceSearching = (section, url) => {
        if (section === "reference") {
            this.goTo(url);
        }
    }

    renderMeaningSection = (section, meaning, meaningSections, definition) => {
        if (meaningSections[section] !== -1) {
            let startIndex = meaningSections[section];
            let endIndex = meaning.length;
            const keys = Object.keys(meaningSections);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === section || meaningSections[keys[i]] === -1) continue;
                if (meaningSections[keys[i]] < endIndex && meaningSections[keys[i]] > meaningSections[section]) {
                    endIndex = meaningSections[keys[i]];
                }
            }
            
            const content = meaning.substr(startIndex + definition.length, endIndex - (startIndex + definition.length));
            return (
                <div className={`${section}`} onClick={() => this.checkForReferenceSearching(section, content)}>
                    <div className="definition">
                        {definition + (section === "reference" ? " " : ":")}
                    </div>
                    {this.correctWordMeaning(content)}
                </div>
            )
        }
    }

    extractPersianMeaning = (meaning, meaningSections) => {
        let minIndex = meaning.length;
        const keys = Object.keys(meaningSections);
        for(let i = 0; i < keys.length; i++) {
            if (meaningSections[keys[i]] === -1) continue;
            if (meaningSections[keys[i]] < minIndex) minIndex = meaningSections[keys[i]];
        }
        return meaning.substr(0, minIndex);
    }

    renderMeaning = (meaning) => {
        let meaningSections = this.processMeaning(meaning);
        return (
            <div className="meaning-synonym">
                <div className="meaning">
                    {this.correctWordMeaning(this.extractPersianMeaning(meaning, meaningSections))}
                </div>
                {this.renderMeaningSection("synonym", meaning, meaningSections, "مترادف")}
                {this.renderMeaningSection("antonym", meaning, meaningSections, "متضاد")}
                {this.renderMeaningSection("reference", meaning, meaningSections, "←")}
            </div>
        )
    }

    showMore = () => {
        this.setState({
            showMore:true
        })
    }

    renderSearchedWords = () => {
        const self = this;
        if (this.state.showMore) {
            return this.state.searchedWords.map(
                (elem, index) => {
                    return (
                        <div key={index} className="word-description">
                            <div className="index-english">
                                <div className="english">
                                    {elem.english}
                                </div>
                                <div className="index">
                                    {this.convertEnglishNumbersToPersian(index + 1)}
                                </div>
                            </div>
                            {self.renderMeaning(elem.persian)}
                        </div>
                    )
                }
            )
        }
        else {
            return (
                <>
                    <div key={0} className="word-description">
                        <div className="index-english">
                            <div className="english">
                                {this.state.searchedWords[0].english}
                            </div>
                            <div className="index">
                                {this.convertEnglishNumbersToPersian(1)}
                            </div>
                        </div>
                        {self.renderMeaning(this.state.searchedWords[0].persian)}
                    </div>
                    <button onClick={this.showMore} type="submit" className="btn btn-primary load-more-btn">
                        نمایش لغات بیشتر
                    </button>
                </>
            )
        }
    }

    handleInputValueChange = (event) => {
        this.setState({
            searchValue:event.target.value
        })
    }

    goTo = (url) => {
        window.open(`/home/${url}`, "_self");
    }

    handleInputSubmit = (event) => {
        if (event.nativeEvent.key === "Enter") {
            this.goTo(this.state.searchValue);
        }
    }

    renderMagnifier = () => {
        return (
            <svg className="magnifier" onClick={() => this.goTo(this.state.searchValue)} focusable="false" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                    </path>
            </svg>
        )
    }

    render() {
        return (
            <>
                <div className="search-input-magnifier">
                    <input autoComplete="off" className="btn input-box" id="search-box" value={this.state.searchValue} onChange={this.handleInputValueChange} onKeyPress={this.handleInputSubmit} type="text" placeholder="Type Your Word Here" />
                    {this.renderMagnifier()}
                    <button onClick={() => this.goTo(this.state.searchValue)} type="submit" className="btn btn-primary">
                        جست و جو
                    </button>
                </div>
                {this.renderSearchResultsSection()} 
            </> 
        );
    }
}

export default Home;