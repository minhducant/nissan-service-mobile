import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const NoteTimeline = (props) => {
    return (
        <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 0 }}>
                <View style={{ borderRadius: 3, width: 32, height: 18, backgroundColor: "#71959e", marginHorizontal: 3 }}></View>
                <Text style={styles.styleTextNote}>Thời gian dự kiến giao xe</Text>
            </View>
            {props.isVisibleCustomer && <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.styleViewNote}></View>
                <Text style={styles.styleTextNote}>Thời gian dự kiến lệnh sửa chữa</Text>
            </View>}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 32 }}>
                <View style={{ borderRadius: 3, width: 32, height: 18, backgroundColor: "#f0373773", marginHorizontal: 3 }}></View>
                <Text style={styles.styleTextNote}>Thời gian thực tế</Text>
            </View>

        </View>
    )
}
export default NoteTimeline

const styles = StyleSheet.create({
    styleViewNote: {
        borderRadius: 3,
        width: 32,
        height: 18,
        backgroundColor: "#F0AD4E",
        marginHorizontal: 3,

    },
    styleTextNote: {
        color: "#000",
        fontSize: 12,
        fontWeight: "700",

    }
})