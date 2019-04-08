import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import HomeView from './HomeView';
import { fetchData } from 'action/fetchAction';
import SQL from 'SQLite/init';

class HomeContainer extends React.Component {
    static defaultProps = {
        openDb: () => SQL.initDb(),
        closeDb: () => SQL.closeDb(),
    }
    state = {
        data: []
    }

    componentDidMount() {

    }

    createTable = () => {
        SQL.db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS USER( '
                + 'id INTEGER PRIMARY KEY NOT NULL, '
                + 'name TEXT ) ; '
            )
                .catch((error) => {
                    console.log(error);
                });
        })
            .then(() => {
                console.log('create success');
            })
    }

    insertData = () => {
        const name = 'thinh' + Math.random();
        SQL.db.transaction(tx => {
            tx.executeSql('INSERT INTO USER (name) VALUES ("' + name + '");')
                .then(() => console.log('insert success'))
        })
            .catch(err => console.log(err))
    }
    loadData = () => {
        console.log(SQL.db);
        SQL.db.transaction(tx => {
            tx.executeSql('SELECT * FROM USER')
                .then(([tx, results]) => {
                    const len = results.rows.length;
                    console.log(len);
                    for (let i = 0; i < len; i++) {
                        const row = results.rows.item(i);
                        console.log();
                        this.setState({
                            data: !_.some(this.state.data, row) 
                            ? [...this.state.data, row] 
                            : _.forEach(this.state.data, value => {
                                if(value.id === row.id) {
                                    return Object.assign(value, row);
                                }
                            })
                        })
                    }
                })
        })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state.data);
        return (
            <HomeView
                {...this.props}
                createTable={this.createTable}
                insertData={this.insertData}
                loadData={this.loadData}
                data={this.state.data}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movie: state.get('movie').get('movie'),
        loading: state.get('movie').get('loading')
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);