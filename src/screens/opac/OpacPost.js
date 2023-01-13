import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OpacPost = ({posts, loading, getTextValue}) => {
  //   if (loading) {
  //     return <Text>Loading...</Text>;
  //   }

  return (
    <View style={styles.listGroup}>
      {posts.map((item, i) => {
        //   {
        //     if (item[2] === null) {
        //       this.state.showitem = false;
        //     } else {
        //       this.state.showitem = true;
        //     }
        //   }
        return (
          <React.Fragment key={i}>
            <TouchableOpacity
              style={styles.commonGradient}
              //   value={this.state.mName}
              onPress={() => getTextValue(item)}>
              <View
                style={{
                  borderRadius: 10,
                }}>
                <LinearGradient
                  colors={['#fff', '#fff']}
                  style={{
                    borderRadius: 10,
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      paddingLeft: 15,
                      paddingRight: 5,
                      paddingTop: 10,
                      borderRadius: 10,
                    }}>
                    <Text style={styles.bookTitle}>{item[1]}</Text>

                    {item[2] && (
                      <Text
                        style={{
                          color: '#050000',
                          // display: this.state.showitem ? 'flex' : 'none',
                        }}>
                        {item[2]}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.oldBookStyle, {marginTop: 10}]}>
                    <Text style={styles.currentIssuesDetailsMap}>
                      By : <Text style={styles.bookAuther}>{item[3]}</Text>
                    </Text>
                  </View>

                  <View style={styles.oldBookStyle}>
                    <Text style={styles.currentIssuesDetailsMap}>
                      Publisher :{' '}
                      <Text
                        style={{
                          width: '60%',
                          marginTop: 5,
                        }}>
                        {item[4]}
                      </Text>
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default OpacPost;

const styles = StyleSheet.create({
  commonGradient: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginBottom: 10,
  },
  bookTitle: {
    width: '100%',
    marginTop: 5,
    fontSize: 17,
    color: '#005580',
    fontWeight: '700',
  },
  bookAuther: {
    width: '60%',
    marginTop: 5,
    fontSize: 15,
  },

  oldBookStyle: {
    flexDirection: 'row',
    paddingRight: 10,
  },

  currentIssuesDetailsMap: {
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#050000',
  },

  listGroup: {
    backgroundColor: '#eff7ee',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '5%',
  },
});
