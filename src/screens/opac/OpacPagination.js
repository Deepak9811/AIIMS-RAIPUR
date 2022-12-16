import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const OpacPagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.pagination}>
          {pageNumbers.map(number => (
            <TouchableOpacity
              style={styles.pageItem}
              onPress={() => paginate(number)}
              >

              <View style={styles.pageLink}>
                <Text style={styles.pageText}>{number}</Text>
              </View>

            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OpacPagination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginLeft: '5%',
    // marginRight: '5%',
  },
  pagination: {
    flexDirection: 'row',
    // marginBottom: '10%',
    // paddingVertical: 10,
    justifyContent: 'space-between',
  },

  pageItem: {
    marginTop: '5%',
  },
  pageLink: {
    paddingRight:5
  },
  pageText: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#ce1412',
    color:"#fff"
  },
});
