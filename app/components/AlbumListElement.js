import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";

import fonts from '../config/fonts.js';


export default class AlbumListElement extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.albumData.strAlbum;
        this.year = this.props.albumData.intYearReleased;
        this.image = this.props.albumData.strAlbumThumb;

        if (this.year == 0) this.year = null;
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Album", {albumData: this.props.albumData})}>
                <View style={styles.container}>
                    <Image 
                        source={(!!this.image) ? {uri: this.image} : require("../assets/defaultAlbumImage.png")}
                        style={styles.albumImage}
                    /> 
                    <View style={styles.textWrapper}>
                        <Text 
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {this.title}
                        </Text>
                        <Text style={styles.year}>
                            {this.year}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        width: "100%"
    },
    albumImage: {
        height: 60,
        width: 60
    },
    textWrapper: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "center"
    },
    title: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.secondaryFontSize,
        color: fonts.primaryFontColor,
        fontWeight: fonts.medium,
        marginBottom: 5
    },
    year: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.ternaryFontSize,
        color: fonts.secondaryFontColor,
        fontWeight: fonts.normal
    }
})