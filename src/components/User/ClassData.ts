class classData {
    getClassData = (clasData: [{id: string, tipo: {id: string, nombre: string, cupos: number, duracion: number }, instructor: string, fecha: Date, cupos: number }], 
                    clasRes: [{id: string, tipo: {id: string, nombre: string, cupos: number, duracion: number }, instructor: string, fecha: Date, cupos: number }]) => {
       var dataSource: {}[] =[];
       clasData.forEach(clas => {
            var reserved = false;
            for (const clasR of clasRes) {
                if(clasR.id == clas.id){
                    reserved = true;
                }
            } 
            if(clasRes.includes(clas)){
                console.log(clas)
                reserved = true;
            }
            let fechaClase = new Date(clas.fecha) 
            var present = false
            if (fechaClase < new Date()){
                present = true;
            }
            var clasDataS = {
                Id: clas.id,
                Subject: clas.tipo.nombre,
                EndTime: new Date(fechaClase.getTime() + clas.tipo.duracion * 60000),
                StartTime: fechaClase,
                Instructor: clas.instructor,
                IsReadonly: present,
                Reserved: reserved,
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