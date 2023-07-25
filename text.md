      <SliderContainer
                sliderValue={[props.startTimeD, props.endTimeD]}>
                <Slider
                  animateTransitions
                  disabled={!props.isEdit}
                  maximumValue={1666699200}
                  minimumTrackTintColor="#cc00006b"
                  maximumTrackTintColor="rgba(255,255,255,0.1)"
                  minimumValue={1666656000}
                  containerStyle={{
                    height: normalize(10),
                    marginTop: normalize(3),
                  }}
                  step={1}
                  thumbTintColor="black"
                  trackStyle={{
                    height: normalize(10),
                    // zIndex: 9999
                  }}
                  thumbStyle={{
                    height: normalize(10),
                    width: normalize(1),
                    // zIndex: -9999
                  }}
                  onValueChange={(value) => console.log(value)}
                  onSlidingComplete={(value) => {
                    _setValue(value);
                  }}
                  onSlidingStart={(e) => { }}
                  renderAboveThumbComponent={(value) => {
                    //  console.log(value);
                    return (
                      <View>
                        <Text style={styles.timeTxt}>
                          {value === 0
                            ? moment(_value[0] * 1000).format('DD-MM-YYYY HH:ss')
                            : moment(_value[1] * 1000).format('DD-MM-YYYY HH:ss')}
                        </Text>
                      </View>
                    );
                  }}
                />
              </SliderContainer>
              <SliderContainer
                sliderValue={[props.itemsStartTimeS, props.itemsEndTimeS]}>
                <Slider
                  animateTransitions
                  disabled={!props.isEdit}
                  maximumValue={1666699200}
                  minimumTrackTintColor="#05ade4"
                  maximumTrackTintColor="rgba(255,255,255,0.1)"
                  minimumValue={1666656000}
                  containerStyle={{
                    height: normalize(10),
                    marginTop: normalize(3),
                  }}
                  step={1}
                  thumbTintColor="black"
                  trackStyle={{
                    height: normalize(10),
                    // zIndex: -9999
                  }}
                  thumbStyle={{
                    height: normalize(10),
                    width: normalize(1),
                    // zIndex: -9999
                  }}
                  onValueChange={(value) => console.log(value)}
                  onSlidingComplete={(value) => {
                    _setValue(value);
                  }}
                  onSlidingStart={(e) => { }}
                  renderAboveThumbComponent={(value) => {
                    // console.log(value);
                    return (
                      <View>
                        <Text style={styles.timeTxt}>
                          {value === 0
                            ? moment(_value[0] * 1000).format('DD-MM-YYYY HH:ss')
                            : moment(_value[1] * 1000).format('DD-MM-YYYY HH:ss')}
                        </Text>
                      </View>
                    );
                  }}
                />
              </SliderContainer>