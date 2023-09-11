module.exports = function () {
    var data = {
        students: [
            
            { id: 1, name: "Soccer Ball", department: "Soccer", bdate:'10/10/2022',gender:"Male",level: 19.50 },
            { id: 2, name: "Corner Flags", department: "Chess", bdate:'10/09/2022',gender:"Female",level: 49.50 }     
        ],
        departments: [
            { id: 1, department: "Soccer" },
            { id: 2,  department: "Chess" } ,
            { id: 3,  department: "Tenis" }   			
        ]
    }
    return data
}