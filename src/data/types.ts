import firebase from 'firebase/auth'

export type Label = {
    [key: string]: string
}
export type Department = {
  id: string,
  name: string
}

export type Err = {
  code: string,
  message: string
}

export type Employee = {
  id: string,
  name: string,
  departmentId: string,
  job: string,
  gender: string,
  salary: number,
  birthDate: number,
  joinDate: number,
  mobile: string,
  address: string,
  image: string
}

export type State = {
  user?: firebase.User,
  departments: Department[],
  employees: Employee[],
  searchText: string
}

export type Action = {
  type: string
  payload?: any
}

