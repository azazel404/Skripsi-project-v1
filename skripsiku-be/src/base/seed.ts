import { Gender } from './../../enums/Gender.enum';

export const majors = [
  {
    code: 'SIIN',
    name: 'Sistem Informasi',
  },
  {
    code: 'TEIN',
    name: 'Teknik Informatika',
  },
  {
    code: 'AKUN',
    name: 'Akuntansi',
  },
  {
    code: 'MANA',
    name: 'Manajemen',
  },
  {
    code: 'SETA',
    name: 'Seni Tari',
  },
];

export const users = [
  {
    email: 'admin@gmail.com',
    password: '123123',
    birthdate: new Date(),
    gender: Gender.MALE,
    first_name: 'admin',
    last_name: 'admin',
    registration_number: 'admin',
    class_of: null,
    phone_number: '08117778899',
    major: null,
    role: 10,
  },
];

export const stages = [
  {
    code: 'PROPOSAL',
    name: 'Proposal',
  },
  {
    code: 'SEMINAR',
    name: 'Seminar',
  },
  {
    code: 'FINAL_TEST',
    name: 'Final_Test',
  },
];
