import { __RewireAPI__ as rewireUser } from './';

describe('user', () => {
  const getUser = rewireUser.__get__('getUser');
  it('should return user object if string is passed as created_by', () => {
    const user = getUser('test');
    expect(user).toEqual({
      Name: 'test',
    });
  });

  it('should return user object with defualt values if created_by is undefined or null', () => {
    const user = getUser(null);
    expect(user).toEqual({
      Name: 'Anonymous',
      Surname: 'Anonymous',
      Avatar: '',
      Id: 0,
    });
  });

  it('should extract user object properly if created_at is an object', () => {
    const user = getUser({
      Id: 1,
      Name: 'John',
      Surname: 'Doe',
      Avatar: 'https://someavatar.png',
    });
    expect(user).toEqual({
      Id: 1,
      Name: 'John',
      Surname: 'Doe',
      Avatar: 'https://someavatar.png',
    });
  });
});
