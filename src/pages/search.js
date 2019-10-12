import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);

        this.loadFunc = this.loadFunc.bind(this);

        this.state = {
            items: [],
            favorite: props.favorite.items,
        };
    }

    componentWillMount() {
        this.loadFunc();
    }

    loadFunc() {
        let items = this.state.items;

        for (let i = 0; i < 15; i++) {
            items.push({title: 'Карточка ' + (items.length + 1), desc: 'Мега-описание карточки'})
        }

        this.setState({items: items});
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.favorite !== nextProps.favorite) {
            this.setState({favorite: nextProps.favorite.items});
        }
    }

    render() {
        return(
            <div className={'content'}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {this.state.items.map((item, key) => {
                        return(
                            <Card className={'card'} key={key}>
                                <CardHeader
                                    title={item.title}
                                    subheader="September 14, 2016"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.desc}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites" onClick={() => {
                                        let array = this.state.favorite;
                                        if (array.indexOf(key) === -1) {
                                            array.push(key);
                                        } else {
                                            array.splice(array.indexOf(key), 1);
                                        }
                                        this.props.onUpdateFavorite(array);
                                    }}>
                                        <FavoriteIcon style={{color: this.state.favorite.indexOf(key) === -1 ? 'grey' : 'red'}} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        );
                    })}
                </InfiniteScroll>
            </div>
            );
    }
}

export default withRouter(connect(
    (state) => ({
        favorite: state.favorite,
    }),
    dispatch => ({
        onUpdateFavorite: (array) => {
            dispatch({ type: 'UPDATE_FAVORITE', payload: array })
        },
    })
)(Search));