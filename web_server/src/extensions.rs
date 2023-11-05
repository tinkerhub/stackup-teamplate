use std::{slice::Iter, str::FromStr};

pub trait PairExt {
    fn next_field<T>(&mut self) -> T
    where
        T: FromStr,
        <T as FromStr>::Err: std::fmt::Debug;
}

impl PairExt for Iter<'_, (&str, Option<&str>)> {
    fn next_field<T>(&mut self) -> T
    where
        T: FromStr,
        <T as FromStr>::Err: std::fmt::Debug,
    {
        self.next()
            .expect("should exist")
            .1
            .expect("should be not null")
            .parse()
            .expect("Should parse")
    }
}
