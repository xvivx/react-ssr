import React from 'react';
import './style.less';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            contract: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536065962&di=5e257ce762fae5bb7d27c8e6bd1eccb7&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.tmgc.com.cn%2Fuploads%2Fallimg%2F20131116%2FfqmlGLxH.jpg',
            sign: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536066024&di=7f453787dfdf2ea6eee96b162fba1ea7&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.gzhcyz.com%2Fupfiles%2Fa1%2F201307%2F23%2Fa069013e0a0aa1838.jpg',
            showFixed: false,
            signFixed: {
                left: 0,
                top: 0
            },
            transform: {
                x: 0,
                y: 0
            },
            chapters: [],
            movingId: -1,
            chapterDiff: {
                x: 0,
                y: 0
            },
            disableScroll: false,
            allow: false
        };

        this.createId = (() => {
            var id = 10;
            return () => id++;
        })();
    }

    componentDidMount() {
       
    }

    onSignLoad = (e) => {
        this.signSize = e.target.getBoundingClientRect();

        this.setState({
            signFixed: {
                left: this.signSize.left,
                top: this.signSize.top
            },
            showFixed: true
        });
    }

    handleContractOnload = (e) => {
        this.contractSize = e.target;
    }

    onSignTouchStart = (e) => {
        this.startPos = e.touches[0];
        this.readyMove = true;
    }

    onSignTouchMove = (e) => {
        if(!this.readyMove) {
            return;
        }

        var x = e.touches[0].clientX - this.startPos.clientX;
        var y = e.touches[0].clientY - this.startPos.clientY;

        this.setState({
            transform: { x, y },
            allow: y + this.state.signFixed.top < Math.min(this.contractDom.clientHeight, this.contractSize.height)
        });
    }

    onSignTouchEnd = (e) => {
        var chapters = this.state.chapters.slice(0);
        var { left, top } = this.state.signFixed;
        var { x, y } = this.state.transform;

        
        if(this.state.allow) {
            var cx = left + x;
            var cy = top + y + this.contractDom.scrollTop;

            cx = Math.min(Math.max(12, cx), this.contractSize.width - this.signSize.width - 22);
            cy = Math.min(Math.max(22, cy), this.contractSize.height - this.signSize.height - 8);

            chapters.push({
                left: cx,
                top: cy,
                id: this.createId()
            });
        }

        this.setState({
            transform: {
                x: 0,
                y: 0
            },
            chapters,
            allow: false
        });
    }

    handleRemove = (chapter) => {
        var chapters = this.state.chapters.slice(0);

        chapters = chapters.filter(item => item.id !== chapter.id);

        this.setState({
            chapters
        });
    }
    
    onChapterTouchStart = (e) => {
        this.chapterStartPos = e.touches[0];

        this.setState({
            disableScroll: true
        });
    }

    onChapterTouchMove = (e, chapter) => {
        var x = e.touches[0].clientX - this.chapterStartPos.clientX;
        var y = e.touches[0].clientY - this.chapterStartPos.clientY;

        
        x = Math.min(
            Math.max(12 - chapter.left, x), 
            this.contractSize.width - this.signSize.width - 20 - chapter.left
        );

        y = Math.min(
            Math.max(22 - chapter.top, y), 
            this.contractSize.height - this.signSize.height - 8 - chapter.top
        );

        this.setState({
            movingId: chapter.id,
            chapterDiff: { x, y }
        });
    }

    onChapterTouchEnd = (e, chapter) => {
        var chapters = this.state.chapters.slice(0);

        chapters = chapters.map((item => {
            if(item.id === chapter.id) {
                item.left = item.left + this.state.chapterDiff.x;
                item.top = item.top + this.state.chapterDiff.y;
            }

            return item;
        }));

        this.setState({
            chapters,
            chapterDiff: {
                x: 0,
                y: 0
            },
            disableScroll: false
        });
    }

    handleRemoveAll = () => {
        this.setState({
            chapters: []
        });
    }

    render() {
        var { contract, sign, signFixed, showFixed, transform, chapters, chapterDiff, movingId, disableScroll, allow } = this.state;
        return (
            <div className="page-container">
                <div 
                    className="contract" 
                    ref={node => this.contractDom = node} 
                    style={{overflowY: disableScroll ? 'hidden' : 'auto' }}
                >
                {
                    chapters.length > 0 && 
                    chapters.map(chapter => (
                        <div
                            onTouchStart={this.onChapterTouchStart}
                            onTouchMove={e => this.onChapterTouchMove(e, chapter)}
                            onTouchEnd={e => this.onChapterTouchEnd(e, chapter)}
                            key={chapter.id}
                            className="chapter-wrapper" 
                            style={{
                                left: chapter.left + 'px', 
                                top: chapter.top + 'px', 
                                zIndex: chapter.id,
                                ...(chapter.id === movingId ? {transform: `translate3D(${chapterDiff.x}px, ${chapterDiff.y}px, 0)`} : {})
                            }}
                        >
                            <img src={sign} className="sign-img" />
                            <div className="mask">
                                <span className="remove-chapter" onClick={() => this.handleRemove(chapter)}>X</span>
                            </div>
                        </div>
                    ))
                }
                    <div className={'pdf-wrapper' + (allow ? ' allow-add-chapter' : '')} >
                        <img onLoad={this.handleContractOnload} src={contract} alt=""/>
                    </div>
                </div>

                <div className="sign">
                    <img className="sign-img" src={sign} onLoad={this.onSignLoad} />
                    {
                        showFixed && 
                        <img 
                            className="sign-fixed sign-img"
                            src={sign} 
                            onTouchStart={this.onSignTouchStart} 
                            onTouchMove={this.onSignTouchMove}
                            onTouchEnd={this.onSignTouchEnd}
                            style={{left: signFixed.left + 'px', top: signFixed.top + 'px', transform: `translate3D(${transform.x}px, ${transform.y}px, 0)` }}
                        />
                    }
                    <div className="btn-groups">
                        <button onClick={this.handleRemoveAll}>清除</button>
                        <button>签署</button>
                    </div>
                </div>
            </div>
        );
    }
};