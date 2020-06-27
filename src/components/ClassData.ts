class classData {
    getClassData = (clasData: [{id: string, tipo: {id: string, nombre: string, cupos: number, duracion: number }, instructor: string, fecha: Date, cupos: number }]) => {
       var dataSource: {}[] =[];  
       clasData.forEach(clas => {
        let fechaClase = new Date(clas.fecha) 
            var clasDataS = {
                Id: clas.id,
                Subject: clas.tipo.nombre,
                EndTime: new Date(fechaClase.getTime() + clas.tipo.duracion * 60000),
                StartTime: fechaClase,
                Instructor: clas.instructor,
                IsReadonly: true,
                Cupos: clas.cupos + "/" + clas.tipo.cupos,
                Duracion: clas.tipo.duracion + " min",
                Cupo: clas.cupos
            } 
            dataSource.push(clasDataS);
        });
        return dataSource
    }
}

export default new classData();