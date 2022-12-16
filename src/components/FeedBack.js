import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import RadioGroup from 'react-native-radio-buttons-group';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import { windowWidth } from '../utils/Dimensions';

const FeedBack = ({
  showResponse,
  showFeedBack,
  newFeedData,
  loaderSubmit,
  typ,
  showRate,
  showGEN,
  showMcq,
  showOption,
  newMcqData,
  description,
  onPressRadioButton,
  onStarRatingPress,
  descrip,
  postFeedBack,
}) => {
  return (
    <View >
      {/* <View style={styles.ln}></View> */}

      <View style={[styles.secondContainer, {alignItems: 'flex-start'}]}>
        <>
          {showResponse ? (
            <View style={styles.wd}>
              <View style={styles.fdTitle}>
                <Text style={styles.txtfd}>Feedback</Text>
              </View>
            </View>
          ) : (
            <View style={styles.respStyle}>
              <Animatable.Text animation={'rubberBand'} style={styles.thnkFbck}>
                Thank You For Your Feedback.
              </Animatable.Text>
              <Animatable.View
                style={styles.successIcon}
                animation={'bounceIn'}>
                <Feather name="check-circle" color="green" size={28} />
              </Animatable.View>
            </View>
          )}
        </>

        {showFeedBack ? (
          <View style={styles.bdy}>
            {newFeedData.map((item, i) => {
              typ = item.type;
              showRate = true;

              if (item.type === 'RATE') {
                showRate = true;
                showGEN = false;
                showMcq = false;
              } else if (item.type === 'GEN') {
                showGEN = true;
                showRate = false;
                showMcq = false;
              } else {
                showGEN = false;
                showRate = false;
                showOption = true;
                showMcq = true;
              }

              if (item.mcq != null) {
                if (item.mcq.length > 0) {
                  newMcqData = item.mcq;

                  showMcqAnswer = true;

                  showOption = true;
                }
              } else {
                showMcqAnswer = true;
                newMcqData = [
                  {
                    answer: 'item.mcq',
                    questionId: item.id,
                    active: item.active,
                    star: item.star,
                    starLenght: i,
                    heading: item.heading,
                  },
                ];
              }
              return (
                <React.Fragment key={i}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.qst}>{item.question}</Text>
                  </View>

                  <View style={styles.rdbtn}>
                    {showMcq ? (
                      <View style={styles.mgt}>
                        <RadioGroup
                          radioButtons={newMcqData}
                          onPress={(radioButtonsArray, i) =>
                            onPressRadioButton(radioButtonsArray, i)
                          }
                        />
                      </View>
                    ) : null}

                    {showMcqAnswer && (
                      <View style={{marginTop: '7%'}}>
                        {newMcqData.map((item, i) => {
                          {
                            if (item.answer === 'item.mcq') {
                              showOption = true;
                            } else {
                              showOption = false;
                            }
                          }
                          return (
                            <React.Fragment key={i}>
                              <View style={styles.fld}>
                                {!showOption ? (
                                  <>
                                    <View style={styles.qstN}>
                                      <Text style={{color: '#000'}}>
                                        {item.answer}
                                      </Text>
                                    </View>
                                  </>
                                ) : (
                                  <>
                                    <>
                                      {showGEN && (
                                        <View
                                          style={[
                                            styles.textAreaContainer,
                                            {
                                              height: 150,
                                            },
                                          ]}>
                                          <TextInput
                                            style={styles.textArea}
                                            underlineColorAndroid="transparent"
                                            placeholder="Description..."
                                            placeholderTextColor="grey"
                                            // numberOfLines={10}
                                            multiline={true}
                                            value={description}
                                            onChangeText={des =>
                                              descrip(des, item)
                                            }
                                          />
                                        </View>
                                      )}
                                    </>

                                    <>
                                      {showRate ? (
                                        <View
                                          style={[
                                            styles.textAreaContainer,
                                            {
                                              borderWidth: 0,
                                              marginTop: 0,
                                              paddingTop: 0,
                                            },
                                          ]}>
                                          <AirbnbRating
                                            type="custom"
                                            defaultRating={0}
                                            // selectedColor="#3498db"
                                            reviews={[
                                              'Bad',
                                              'Good',
                                              'Very Good',
                                              'Amazing',
                                              'Unbelievable',
                                            ]}
                                            onFinishRating={count =>
                                              onStarRatingPress(count, item, i)
                                            }
                                            style={{
                                              paddingVertical: 10,
                                            }}
                                          />
                                        </View>
                                      ) : null}
                                    </>
                                  </>
                                )}
                              </View>
                            </React.Fragment>
                          );
                        })}
                      </View>
                    )}
                  </View>
                </React.Fragment>
              );
            })}

            <TouchableOpacity
              style={[styles.button, {marginTop: 30}]}
              onPress={() => postFeedBack()}>
              <LinearGradient
                colors={['#ff7e82', '#ce1412']}
                style={styles.signIn}>
                {loaderSubmit ? (
                  <ActivityIndicator color="#fff" size="large" />
                ) : (
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Submit
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  fld: {
    flexDirection: 'row',
  },
  ln: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: '10%',
  },
  wd: {
    width: '100%',
  },
  qst: {
    paddingRight: '5%',
    textAlign: 'left',
    marginTop: '5%',
    color: '#000',
    paddingLeft:10
  },
  bdy: {
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%',
    padding: 5,
  },
  thnkFbck: {
    fontWeight: 'bold',
    marginRight: '4%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    fontSize: 16,
    color: '#050000',
  },
  qstN: {
    marginRight: '2%',
    marginLeft: '2%',
    marginBottom: 15,
  },
  fdTitle: {
    width: '100%',
    marginTop: '5%',
    borderBottomWidth: 1,
    paddingBottom: '3%',
    borderColor: '#E2E2E2',
  },
  txtfd: {
    textTransform: 'capitalize',
    fontSize: 18,
    width: '90%',
    color: '#000',
    paddingLeft:10
  },
  mgt: {
    marginTop: '5%',
  },
  rdbtn: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: '5%',
    borderBottomColor: '#E2E2E2',
  },
  textAreaContainer: {
    marginLeft: '5%',
    paddingRight: '2%',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    padding: 5,
    width: '93%',
    borderRadius: 5,
    marginBottom: '5%',
  },
  textArea: {
    // height: 150,
    paddingBottom: '10%',
    justifyContent: 'flex-start',
    color: '#050000',
  },
  button: {
    alignItems: 'center',
    marginTop: 13,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  respStyle: {
    flexDirection: 'row',
    padding: '5%',
  },
});
