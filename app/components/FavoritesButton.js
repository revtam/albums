import React, {Component} from "react";
import { View, StyleSheet, Text, Image, TouchableNativeFeedback } from "react-native";

import colors from "../config/colors";
import fonts from "../config/fonts";


export default class FavoritesButton extends Component {
    constructor(props) {
        super(props);
        this.style = this.props.style;
    }
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.onPress()}>
                <View style={(this.props.active) ? 
                    [ styles.favoritesButton, this.style, styles.backgroundActive ] : 
                    [ styles.favoritesButton, this.style, styles.backgroundInactive ]}
                >
                    <Image 
                        source={require('../assets/heart-filled.png')}
                        style={(this.props.active) ? [ styles.favoritesIcon, styles.iconActive ] : [ styles.favoritesIcon, styles.iconInactive ]}
                    />
                    <Text style={(this.props.active) ? [ styles.favoritesText, styles.textActive ] : [ styles.favoritesText, styles.textInactive ]}>
                        Favorites
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    favoritesButton: {
        paddingHorizontal: 15,
        backgroundColor: "#484848",
        borderRadius: 100, 
        flexDirection: "row",
        alignItems: "center",
        height: 50
    },
    favoritesIcon: {
        width: 20,
        resizeMode: "contain",
        marginRight: 12
    },
    favoritesText: {
        fontFamily: fonts.fontFamily,
        fontWeight: fonts.normal, 
        fontSize: fonts.secondaryFontSize
    },
    iconInactive: {
        tintColor: colors.primaryBlue
    },
    iconActive: {
        tintColor: colors.baseDark
    },
    textInactive: {
        color: colors.primaryWhite
    },
    textActive: {
        color: colors.baseDark,
    },
    backgroundInactive: {
        backgroundColor: "#484848"
    },
    backgroundActive: {
        backgroundColor: colors.primaryBlue
    }
})
