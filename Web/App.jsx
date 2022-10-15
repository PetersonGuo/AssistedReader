/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import Header from './components/Header';
import Description from './components/Description';
import ReadButton from './components/ReadButton';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    export default function App() {
        return (
            <View style={styles.sectionContainer}>
                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: isDarkMode ? Colors.white : Colors.black,
                        },
                    ]}>
                    {title}
                </Text>
                <Text
                    style={[
                        styles.sectionDescription,
                        {
                            color: isDarkMode ? Colors.light : Colors.dark,
                        },
                    ]}>
                    {children}
                </Text>
            </View>
        );
    };

    const App: () => Node = () => {
        const isDarkMode = useColorScheme() === 'dark';

        const backgroundStyle = {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        };

        return (
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <SafeAreaView style={{flex: 1}}>
                        <ScrollView style={{backgroundColor: '#00ffff'}}>
                            <Header />
                            <View
                                style={{
                                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                                }}>
                                <Section title="Step One">
                                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                                    screen and then come back to see your edits.
                                </Section>
                                <Section title="See Your Changes">
                                    <ReloadInstructions />
                                </Section>
                                <Section title="Debug">
                                    <DebugInstructions />
                                </Section>
                                <Section title="Learn More">
                                    Read the docs to discover what to do next:
                                </Section>
                                <LearnMoreLinks />
                            </View>
                            <Description
                                subtitle="What Is Assistant Reader?"
                                desc="Assistant Reader is an app designed to allow blind individuals to read text, by transforming text recognized through a camera into speech"
                            />
                            <Description
                                subtitle="How To Use Assistant Reader"
                                desc="All you need to do is to put on the pair of glasses, and whenever you want to read any text in front of you, just press and hold and button and it will translate any text it sees into speech"
                            />
                            <Description
                                subtitle="Now Try It!"
                                desc="Click the 'Read' button with your camera facing some text, and listen as the text gets read out loud! "
                            />
                            <ReadButton />
                        </ScrollView>
                    </SafeAreaView>
                    );
                    };

                    const styles = StyleSheet.create({
                    sectionContainer: {
                    marginTop: 32,
                    paddingHorizontal: 24,
                },
                    sectionTitle: {
                    fontSize: 24,
                    fontWeight: '600',
                },
                    sectionDescription: {
                    marginTop: 8,
                    fontSize: 18,
                    fontWeight: '400',
                },
                    highlight: {
                    fontWeight: '700',
                },
                });

                    export default App;
                    }

