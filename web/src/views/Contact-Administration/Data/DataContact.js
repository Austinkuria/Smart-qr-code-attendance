/* eslint-disable prettier/prettier */

function createData(name, role, emailX, telephoneX) {
  return {
    name,
    role,
    contact: [
      {
        telephone: telephoneX,
        email: emailX,
      },
    ],
  };
}

export const rows = [
  createData(
    'Prof. Samuel Mwangi',
    'Deputy Dean of Academic Affairs, School of Health Sciences',
    'samuel.mwangi@kyu.ac.ke',
    '+254 722 344 822'
  ),
  createData(
    'Prof. Esther Njeri',
    'Deputy Dean of Research and International Relations, School of Pure and Applied Sciences',
    'esther.njeri@kyu.ac.ke',
    '+254 722 344 822'
  ),
  createData(
    'Prof. Peter Odhiambo',
    'Chairperson, Department of Medical Laboratory Sciences, School of Health Sciences',
    'peter.odhiambo@kyu.ac.ke',
    '+254 722 399 915 – +254 722 344 822'
  ),
  createData(
    'Prof. Lucy Akinyi',
    'Chairperson, Department of Computer Science, School of Pure and Applied Sciences',
    'lucy.akinyi@gmail.com',
    '+254 722 344 822'
  ),
  createData(
    'Prof. Grace Wambui',
    'Chairperson, Department of Nursing, School of Health Sciences',
    'grace.wambui@yahoo.com',
    '+254 722 399 679 – +254 722 344 822'
  ),
  createData(
    'Prof. James Kamau',
    'Chairperson, Department of Civil Engineering, School of Engineering and Technology',
    'james.kamau@kyu.ac.ke',
    '+254 722 399 915 - +254 722 344 822'
  ),
  createData(
    'Prof. Mary Kanyari',
    'Chairperson, Department of Biochemistry, School of Pure and Applied Sciences',
    'mary.kanyari@gmail.com',
    '+254 722 399 679 – +254 722 344 822'
  ),
  createData(
    'Prof. David Otieno',
    'Coordinator, Preparatory Years Program, School of Education',
    'david.otieno@yahoo.com',
    '+254 722 399 679'
  ),
  createData(
    'Prof. Daniel Kibet',
    'Chairperson, Department of Social Work, School of Social Sciences',
    'daniel.kibet@kyu.ac.ke',
    '+254 722 399 679 – +254 722 344 822'
  ),
  createData(
    'Prof. Jane Wairimu',
    'Chairperson, Department of Software Engineering, School of Pure and Applied Sciences',
    'jane.wairimu@kyu.ac.ke',
    '+254 722 399 123 – +254 722 344 822'
  ),
];
