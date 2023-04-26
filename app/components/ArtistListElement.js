import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";

import fonts from '../config/fonts.js';
import FavoriteToggler from "../components/FavoriteToggler.js";


export default class ArtistListElement extends Component {
    constructor(props) {
        super(props);
        this.artistName = this.props.artistData.name;
        this.image = this.props.artistData.image;
    }
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Artist", {artistName: this.artistName})}>
                <View style={styles.container}>
                    <Image 
                        source={(!!this.image) ? {uri: this.image} : require("../assets/defaultArtistImage.png")}
                        style={styles.artistImage}
                    /> 
                    <View style={styles.artistNameWrapper}>
                        <Text 
                            style={styles.artistName}
                            numberOfLines={1}
                        >
                            {this.artistName}
                        </Text>
                    </View> 
                    <View style={styles.favoriteTogglerContainer}>
                        <FavoriteToggler 
                            height={60}
                            showTooltip={false}
                            item={this.props.artistData}
                        />
                    </View>       
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingLeft: 15,
        paddingRight: 7
    },
    artistImage: {
        height: 70,
        width: 70
    },
    artistNameWrapper: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center"
    },
    artistName: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.secondaryFontSize,
        color: fonts.primaryFontColor,
        fontWeight: fonts.normal,
    },
    favoriteTogglerContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})