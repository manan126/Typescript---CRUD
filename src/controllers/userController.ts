import { Request, Response } from 'express';
import { User, users } from '../models/userModel';

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUser = (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser: User = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], name, email };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
};